import React from "react";
import Product from "../Product/Product";
import styles from "./styles.module.css";

const Suggestions = ({ disp, data, keyword, setKeyword }) => {
  const temp_suggestions = ["active guard", "shoes", "t-shirts", "dress"];
  const pages = data.pages;
  const products = data.items;

  return (
    <div className={styles.suggestionsContainer} style={{ display: `${disp}` }}>
      <div className={styles.suggestionsBar}>
        <div className={styles.suggestionsBarLeft}>
          <div className={styles.suggestions}>
            <ul>
              <li className={styles.suggestionsLabel}>POPULAR SUGGESTIONS</li>
              {keyword === "" || data.suggestions == 0
                ? temp_suggestions?.map((suggestion) => (
                    <li
                      key={suggestion}
                      className={styles.suggestionsContent}
                      onMouseDown={() => setKeyword(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))
                : data.suggestions?.map((suggestion) => (
                    <li
                      key={suggestion}
                      className={styles.suggestionsContent}
                      onMouseDown={() => setKeyword(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
            </ul>
          </div>
          {keyword === "" || data.totalItems == 0 ? null : (
            <>
              <div className={styles.collections}>
                <ul>
                  {/* I didn't find any collections property in given "data" API 
                  so accessed the "data.facets", so it will show
                  "No Collections Found" mostly. */}
                  <li className={styles.suggestionsLabel}>Collections</li>
                  {keyword === "" || data.facets == 0 ? (
                    <li className={styles.suggestionsContent}>
                      No Collections Found.
                    </li>
                  ) : (
                    data.facets?.map((facets) => (
                      <li
                        key={facets}
                        className={styles.suggestionsContent}
                        onMouseDown={() => setKeyword(data.facets)}
                      >
                        {data.facets}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className={styles.pages}>
                <ul>
                  <li className={styles.suggestionsLabel}>Pages</li>
                  {keyword === "" || pages == 0 ? (
                    <li className={styles.suggestionsContent}>
                      No Pages Found.
                    </li>
                  ) : (
                    pages?.map((page) => (
                      <li key={page} className={styles.suggestionsContent}>
                        {page.title}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              {data.totalItems > 6 && (
                <div className={styles.viewItems}>
                  <span>{`View all ${data.totalItems} items`}</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className={styles.suggestionsBarRight}>
          <ul>
            <li className={styles.suggestionsLabel}>Products</li>

            {keyword === "" || products == 0 ? (
              <li className={styles.suggestionsContent}>
                Start typing for search results
              </li>
            ) : (
              products?.map((product) => (
                <li key={product.product_id} className={styles.productList}>
                  <Product product={product} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
