import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchAmenitiesForSpaces, type SpaceAmenity } from "../../api/spacesAmenities"
import { AmenityIcon } from "../shared/AmenityIcon"

interface SpaceAmenitiesBadgesProps {
  spaceId: string
}

export function SpaceAmenitiesBadges({ spaceId }: SpaceAmenitiesBadgesProps) {
  const { data } = useQuery<Record<string, SpaceAmenity[]>>({
    queryKey: ["spaceAmenities", spaceId],
    queryFn: () => fetchAmenitiesForSpaces([spaceId]),
    staleTime: 5 * 60 * 1000,
  })

  const amenities = data?.[spaceId] ?? []
  if (!amenities.length) return null

  return (
    <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-500">
      {amenities.slice(0, 4).map((amenity, idx) => (
        <AmenityIcon
          key={`${idx}-${amenity.label}`}
          iconUrl={amenity.iconUrl}
          className="text-primary"
          label={amenity.label}
        />
      ))}
    </div>
  )
}

