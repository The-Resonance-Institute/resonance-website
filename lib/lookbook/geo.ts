// Server-only: turns world-atlas TopoJSON into SVG path strings at build time,
// so the browser never downloads map data.
import { geoConicConformal, geoPath, geoGraticule10 } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import countries from "world-atlas/countries-50m.json";

export type MapGeometry = {
  width: number;
  height: number;
  land: string;
  borders: string;
  graticule: string;
  project: (lon: number, lat: number) => [number, number];
};

export function buildMap(
  width: number,
  height: number,
  bounds: { west: number; east: number; south: number; north: number },
): MapGeometry {
  const topo = countries as unknown as Topology<{ countries: GeometryCollection; land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land);
  const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b);

  const { west, east, south, north } = bounds;
  // Fit to points along the bounding box edges. (A Polygon here would need
  // clockwise winding, or d3 treats it as the whole globe minus the box.)
  const edge: [number, number][] = [];
  for (let i = 0; i <= 10; i++) {
    const lon = west + ((east - west) * i) / 10;
    const lat = south + ((north - south) * i) / 10;
    edge.push([lon, south], [lon, north], [west, lat], [east, lat]);
  }
  const frame = { type: "MultiPoint" as const, coordinates: edge };

  const projection = geoConicConformal()
    .rotate([-(west + east) / 2, 0])
    .parallels([south + 5, north - 5])
    .fitExtent(
      [
        [0, 0],
        [width, height],
      ],
      frame,
    )
    .clipExtent([
      [0, 0],
      [width, height],
    ]);

  const path = geoPath(projection).digits(1);
  return {
    width,
    height,
    land: path(land) ?? "",
    borders: path(borders) ?? "",
    graticule: path(geoGraticule10()) ?? "",
    project: (lon, lat) => {
      const p = projection([lon, lat]) ?? [0, 0];
      return [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];
    },
  };
}
