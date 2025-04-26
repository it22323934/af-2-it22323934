import React, { useState, useEffect, useTransition } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCountryByCode, clearCache } from "../service/api";
import LoadingSpinner from "../components/LoadingSpinner";
import CountryError from "../components/country-details/CountryError";
import CountryNavigation from "../components/country-details/CountryNavigation";
import CountryFlagSection from "../components/country-details/CountryFlagSection";
import CountryInfoSection from "../components/country-details/CountryInfoSection";

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
      clearCache();
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
    return <CountryError error={error} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-5" data-testid="country-detail-page ">
      <div className="container mx-auto px-4 max-w-6xl">
        <CountryNavigation 
          handleRefresh={handleRefresh} 
          refreshing={refreshing} 
        />

        {country && (
          <div className="grid md:grid-cols-2 gap-6">
            <CountryFlagSection country={country} />
            <CountryInfoSection country={country} />
          </div>
        )}
      </div>
    </div>
  );
}