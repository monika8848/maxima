import { useSelector } from 'react-redux';
import { Norecord } from '../NoRecord';
import ProductDetailLoadingLayout from './ProductDetailLoadingLayout';
import BreadCrumbs from './ProductDetails/BreadCrumbs';
import CheckStockAvailability from './ProductDetails/CheckStockAvailabilty';
import ProductDetail from './ProductDetails/ProductDetail';
import ProductItemsOptions from './ProductDetails/ProductItemsOptions';
import ProductEnlargeImage from './ProductEnlargeImage';
import ProductSpecificationMaster from './ProductSpecifications/ProductSpecificationMaster';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import ReviewsMaster from '../Review/ReviewsMaster';
import useProductReview from '../../hooks/ProductReviewHook/product-review-hook';
import ProductFeature from './ProductFeature/ProductFeature';
import usePincodeValidation from '../../hooks/ProductDetailHook/validate-pincode-hook';
import useProductDetails from '../../hooks/ProductDetailHook/ProductDetailHookNew/product-details-hook';
import useMatchingItemOptions from '../../hooks/ProductDetailHook/matching-item-option-hook';
const ProductDetailMaster = () => {
  const {
    productImageLoading,
    productDetailLoading,
    productDetailData,
    productImages,
    handleStockAvail,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    productQuantity,
    handleAddCartB2c,
    stockAvailabilityTextChanges,
    isDealer,
    isLoggedIn,
    checkStock,
    currency_state_from_redux,
    newobjectState,
    setnewObjectState,
    doesSelectedVariantDoesNotExists,
    stockDoesNotExistsForSelectedVariants,
    stockAvailability,
    handleVariantSelect,
    selectedVariant,
    isLoading,
    thumbnailOfVariants,
    selectedMultiLangData,
    token,
    singleProductForAddToCart, 
    setSingleProductForAddToCart,
    quantityOfSingleProduct
  } = useProductDetails();
  const {productItemOptions , matchingItemLoading} = useMatchingItemOptions();

  console.log(productDetailLoading, 'productDetailData');
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const { reviewData, loading } = useProductReview();
  console.log(reviewData, 'reviewww');


  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const {pincodeRes,setPincode,Loadings} = usePincodeValidation();
  return (
    <div className="margin_from_nav_lp">
      <div className="container product_detail_container">
        <div className="row">
          <div className="col-12 mt-4">
            <BreadCrumbs />
          </div>
          {productDetailLoading === true ? (
            <div className="row justify-content-center">
              {[...Array(1)].map(() => (
                <>
                  <div className="col-lg-12 mx-auto">
                    <ProductDetailLoadingLayout />
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              {Object?.keys(productDetailData)?.length > 0 ? (
                <>
                  <div className="col-lg-6">
                    <ProductEnlargeImage productImages={productImages} />
                  </div>
                  <div className="col-lg-6">
                    <ProductDetail
                      productDetailData={productDetailData}
                      // productVariants={productVariants}
                      selectedVariant={selectedVariant}
                      thumbnailOfVariants={thumbnailOfVariants}
                      handleVariantSelect={handleVariantSelect}
                      handleQuantity={handleQuantity}
                      handleQuantityIncrement={handleQuantityIncrement}
                      handleQuantityDecrement={handleQuantityDecrement}
                      productQuantity={productQuantity}
                      currency_state_from_redux={currency_state_from_redux}

                      // minQty={minQty}
                      pincodeRes={pincodeRes}
                      setPincode={setPincode}
                      Loadings={Loadings}
                      stockAvailabilityTextChanges={
                        stockAvailabilityTextChanges
                      }
                      handleStockAvail={handleStockAvail}
                      // testBtn={testBtn}
                      productDetailLoading={productDetailLoading}
                      doesSelectedVariantDoesNotExists={
                        doesSelectedVariantDoesNotExists
                      }
                      stockDoesNotExistsForSelectedVariants={
                        stockDoesNotExistsForSelectedVariants
                      }
                      selectedMultiLangData={selectedMultiLangData}
                      newobjectState={newobjectState}
                      setnewObjectState={setnewObjectState}
                      token={token}
                      isDealer={isDealer}
                      isLoggedIn={isLoggedIn}
                      singleProductForAddToCart={singleProductForAddToCart}
                      setSingleProductForAddToCart = {setSingleProductForAddToCart}
                      quantityOfSingleProduct={quantityOfSingleProduct}
                    />
                  </div>
                </>
              ) : (
                <Norecord
                  heading={selectedMultiLangData?.product_not_found}
                  content={selectedMultiLangData?.product_not_found_s}
                />
              )}
            </>
          )}
        </div>
        {checkStock === true && (
          <div className="col-lg-12 mt-5">
            <CheckStockAvailability
              stockAvailability={stockAvailability}
              selectedMultiLangData={selectedMultiLangData}
            />
          </div>
        )}
      </div>
      {/* <div className="mb-2">
        <ProductFeature productDetails={productDetailData} />
      </div> */}
      <div className="mb-2">
        {productDetailData?.prod_specifications?.length > 0 && (
          <ProductSpecificationMaster
            specifications={productDetailData?.prod_specifications}
            selectedMultiLangData={selectedMultiLangData}
          />
        )}
      </div>
      {reviewData !== null && (
        <div className="mb-2">
          <ReviewsMaster reviewData={reviewData} />
        </div>
      )}
      {productItemOptions?.length > 0 &&
        productItemOptions !== null &&
        productItemOptions.map((items: any, index: any) => {
          return (
            <>
              <div key={index}>
                {items?.values?.length > 0 && (
                  <ProductItemsOptions
                    items={items}
                    selectedMultiLangData={selectedMultiLangData}
                    currency_state_from_redux={currency_state_from_redux}
                  />
                )}
              </div>
            </>
          );
        })}
    </div>
  );
};
export default ProductDetailMaster;
