import {
  BuyMovieProviders,
  RentMovieProviders,
  StreamingProviders,
} from "./filmProviders";
import providers from "./filmProvidersTab.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faClock,
  faStream,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

export const ProvidersTab = ({ provider }) => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (provider.movieStreamingProviders) {
      setActiveTab("streaming");
    } else if (provider.movieBuyProviders) {
      setActiveTab("buy");
    } else if (provider.movieRentProviders) {
      setActiveTab("rent");
    }
  }, [
    provider.movieStreamingProviders,
    provider.movieBuyProviders,
    provider.movieRentProviders,
  ]);

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={providers.container}>
      <div className={providers.tabs}>
        {provider.movieStreamingProviders && (
          <button
            className={`${providers.tab} ${
              activeTab === "streaming" ? `${providers.tabActive}` : ""
            }`}
            onClick={() => showTab("streaming")}
          >
            Stream
            <FontAwesomeIcon icon={faStream} />
          </button>
        )}
        {provider.movieBuyProviders && (
          <button
            className={`${providers.tab} ${
              activeTab === "buy" ? `${providers.tabActive}` : ""
            }`}
            onClick={() => showTab("buy")}
          >
            Buy
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        )}
        {provider.movieRentProviders && (
          <button
            className={`${providers.tab} ${
              activeTab === "rent" ? `${providers.tabActive}` : ""
            }`}
            onClick={() => showTab("rent")}
          >
            Rent
            <FontAwesomeIcon icon={faClock} />
          </button>
        )}
      </div>
      {provider.movieStreamingProviders && (
        <div
          className={providers.content}
          style={{ display: activeTab === "streaming" ? "block" : "none" }}
        >
          <StreamingProviders movie={provider} />
        </div>
      )}
      {provider.movieBuyProviders && (
        <div
          className={providers.content}
          style={{ display: activeTab === "buy" ? "block" : "none" }}
        >
          <BuyMovieProviders movie={provider} />
        </div>
      )}
      {provider.movieRentProviders && (
        <div
          className={providers.content}
          style={{ display: activeTab === "rent" ? "block" : "none" }}
        >
          <RentMovieProviders movie={provider} />
        </div>
      )}
    </div>
  );
};

export default ProvidersTab;
