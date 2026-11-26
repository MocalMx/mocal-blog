import * as React from "react";
import { MapPin } from "lucide-react";

import type { MainRecommendedSpace } from "../../api/mainRecommendedSpaces";
import { withMocalOriginUtm } from "../../utils/links";
import { SpaceAmenitiesBadges } from "./SpaceAmenitiesBadges";

interface FeaturedSpacesProps {
  spaces: MainRecommendedSpace[] | undefined;
  isLoading: boolean;
  isError: boolean;
  locationError: string | null;
}

export function FeaturedSpaces({
  spaces,
  isLoading,
  isError,
  locationError,
}: FeaturedSpacesProps) {
  return (
    <section className="mt-12 rounded-3xl py-8">
      <div>
        <h2 className="text-lg font-semibold text-brand">
          Espacios recomendados cerca de ti
        </h2>
      </div>

      {locationError ? (
        <p className="mt-4 text-xs text-red-600">{locationError}</p>
      ) : null}

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500">
          Buscando espacios cerca de ti...
        </p>
      ) : null}

      {isError ? (
        <p className="mt-4 text-sm text-red-600">
          No pudimos cargar los espacios recomendados. Intenta más tarde.
        </p>
      ) : null}

      {spaces && spaces.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {spaces.map((space) => {
              const spaceUrl = withMocalOriginUtm(
                `https://mocal.com.mx/spaces/${space.id}`,
              );

              return (
                <a
                  key={space.id}
                  href={spaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
                    {space.imageUrls[0] ? (
                      <img
                        src={space.imageUrls[0]}
                        alt={space.name}
                        className="h-full w-full rounded-3xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-brand to-primary" />
                    )}

                    <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                      DESDE{" "}
                      {space.price != null && space.currency
                        ? space.price.toLocaleString("es-MX", {
                            style: "currency",
                            currency: space.currency,
                            maximumFractionDigits: 0,
                          })
                        : "—"}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-1 pb-2 pt-3 sm:px-2">
                    <h3 className="line-clamp-2 text-sm font-semibold text-brand">
                      {space.name}{" "}
                      <span className="mt-1 text-xs text-gray-500">
                        {space.area_sqm != null
                          ? ` · ${space.area_sqm} m²`
                          : ""}
                      </span>
                    </h3>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="truncate">{space.location}</span>
                    </div>

                    <SpaceAmenitiesBadges spaceId={space.id} />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={withMocalOriginUtm("https://mocal.com.mx/search")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-brand hover:bg-gray-50"
            >
              Cargar más espacios
            </a>
          </div>
        </>
      ) : !isLoading && !isError ? (
        <p className="mt-4 text-sm text-gray-500">
          No encontramos espacios recomendados en este momento.
        </p>
      ) : null}
    </section>
  );
}
