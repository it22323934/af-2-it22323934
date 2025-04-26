import React, { useState, useEffect, useTransition } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCountryByCode, clearCache } from "../service/api";
import LoadingSpinner from "../components/LoadingSpinner";
import CountryMap from "../components/CountryMap";
import {
  Button,
  Badge,
  Tabs,
  Card,
  Alert,
  Spinner,
  Tooltip,
} from "flowbite-react";
import {
  ArrowLeftIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  MapPinIcon,
  UsersIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch country data with cache support
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryByCode(code);

        // Start transition to prevent UI jank when updating state
        startTransition(() => {
          setCountry(data);
          setError(null);
        });
      } catch (err) {
        console.error("Error fetching country:", err);
        setError(`Failed to fetch details for country code: ${code}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [code]);

  // Handle manual refresh with cache clearing
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      // Clear the cache for this specific country
      clearCache();
      // Re-fetch data
      const data = await fetchCountryByCode(code);
      setCountry(data);
      setError(null);
    } catch (err) {
      setError("Failed to refresh country data.");
    } finally {
      setRefreshing(false);
    }
  };

  // Handle invalid country codes by redirecting
  useEffect(() => {
    if (error && !loading) {
      const timer = setTimeout(() => {
        navigate("/", {
          state: { error: `Country with code "${code}" not found.` },
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, loading, navigate, code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Alert color="failure" icon={ExclamationCircleIcon}>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-lg">{error}</span>
            <p>Redirecting to home page in 5 seconds...</p>
            <Button onClick={() => navigate("/")} color="failure" size="xs">
              Go to Home Page Now
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
      data-testid="country-detail-page"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Button as={Link} to="/" color="light" data-testid="back-button">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </Button>

          <Tooltip content="Refresh country data">
            <Button
              color="light"
              onClick={handleRefresh}
              disabled={refreshing}
              data-testid="refresh-button"
            >
              {refreshing ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                <ArrowPathIcon className="h-5 w-5 mr-1" />
              )}
              Refresh
            </Button>
          </Tooltip>
        </div>

        {country && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={country.flags.alt || `${country.name.common} flag`}
                  className="w-full h-auto object-contain transition-all hover:scale-105 duration-300"
                  loading="eager"
                  data-testid="country-flag"
                />
                {country.coatOfArms?.svg && (
                  <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md">
                    <Tooltip content="National Coat of Arms">
                      <img
                        src={country.coatOfArms.svg}
                        alt="Coat of Arms"
                        className="h-12 w-12"
                      />
                    </Tooltip>
                  </div>
                )}
              </div>

              <div className="mt-8 w-full">
                <CountryMap
                  lat={country.latlng?.[0]}
                  lng={country.latlng?.[1]}
                  name={country.name.common}
                  data-testid="country-map"
                />
              </div>
            </div>

            <div className="dark:text-white">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold" data-testid="country-name">
                  {country.name.common}
                </h1>
                <Badge color="purple" size="xl">
                  {country.region}
                </Badge>
                {country.independent && (
                  <Badge color="success">Independent</Badge>
                )}
                {country.unMember && <Badge color="info">UN Member</Badge>}
              </div>

              <Tabs aria-label="Country information tabs">
                <Tabs.Item title="General" icon={GlobeAltIcon} active>
                  <Card className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Official Name:</span>{" "}
                          {country.name.official}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Native Name:</span>{" "}
                          {Object.values(country.name.nativeName || {})[0]
                            ?.common || "N/A"}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Capital:</span>{" "}
                          {country.capital?.[0] || "N/A"}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Region:</span>{" "}
                          {country.region}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Sub Region:</span>{" "}
                          {country.subregion || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <span className="font-semibold">Population:</span>{" "}
                          {country.population.toLocaleString()}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Area:</span>{" "}
                          {country.area?.toLocaleString()} km²
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">
                            Top Level Domain:
                          </span>{" "}
                          {country.tld?.[0] || "N/A"}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Independent:</span>{" "}
                          {country.independent ? "Yes" : "No"}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">UN Member:</span>{" "}
                          {country.unMember ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Tabs.Item>

                <Tabs.Item title="Currency" icon={CurrencyDollarIcon}>
                  <Card>
                    <h3 className="text-xl font-semibold mb-4">Currencies</h3>
                    {Object.entries(country.currencies || {}).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(country.currencies || {}).map(
                          ([code, currency]) => (
                            <div
                              key={code}
                              className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
                            >
                              <p className="font-bold">{currency.name}</p>
                              <p>Code: {code}</p>
                              <p>Symbol: {currency.symbol || "N/A"}</p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p>No currency information available.</p>
                    )}
                  </Card>
                </Tabs.Item>

                <Tabs.Item title="Languages" icon={LanguageIcon}>
                  <Card>
                    <h3 className="text-xl font-semibold mb-4">Languages</h3>
                    {Object.entries(country.languages || {}).length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(country.languages || {}).map(
                          ([code, language]) => (
                            <Badge
                              key={code}
                              color="info"
                              className="text-sm p-2"
                            >
                              {language} ({code})
                            </Badge>
                          )
                        )}
                      </div>
                    ) : (
                      <p>No language information available.</p>
                    )}
                  </Card>
                </Tabs.Item>

                <Tabs.Item title="Borders" icon={MapPinIcon}>
                  <Card>
                    <h3 className="text-xl font-semibold mb-4">
                      Border Countries
                    </h3>
                    {country.borders && country.borders.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {country.borders.map((border) => (
                          <Button
                            key={border}
                            as={Link}
                            to={`/country/${border}`}
                            color="light"
                            size="sm"
                            data-testid={`border-${border}`}
                          >
                            {border}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p>This country has no bordering countries.</p>
                    )}
                  </Card>
                </Tabs.Item>

                <Tabs.Item title="Demographics" icon={UsersIcon}>
                  <Card>
                    <h3 className="text-xl font-semibold mb-4">Demographics</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Population</h4>
                        <p className="text-2xl font-bold">
                          {country.population.toLocaleString()}
                        </p>
                      </div>

                      {country.area && (
                        <div>
                          <h4 className="font-medium">Population Density</h4>
                          <p className="text-xl">
                            {(country.population / country.area).toFixed(2)}{" "}
                            people per km²
                          </p>
                        </div>
                      )}

                      {country.car && (
                        <div>
                          <h4 className="font-medium">Driving Side</h4>
                          <p>
                            {country.car.side === "right"
                              ? "Right side"
                              : "Left side"}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
