import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { CONSTANTS } from '../services/config/app-config';
import { ProductCardProps } from '../interfaces/product-card-interface';
import { fetchWishlistUser } from '../store/slices/wishlist-slice/wishlist-slice';
import { useDispatch, useSelector } from 'react-redux';
import AddToCartApi from '../services/api/cart-page-api/add-to-cart-api';
import {
  failmsg,
  hideToast,
  successmsg,
} from '../store/slices/general_slices/toast_notification_slice';
import { fetchCartListing } from '../store/slices/cart-listing-page-slice/cart-listing-slice';
import deleteCatalog from '../services/api/product-catalog-api/delete-catalog-api';
import { get_access_token } from '../store/slices/auth/token-login-slice';
import { useRouter } from 'next/router';
import deleteItemFromCatalog from '../services/api/product-catalog-api/delete-item-from-catalog-api';
import { ProductListingThunk } from '../store/slices/product-listing-page-slices/product-listing-slice';
import { filters_selector_state } from '../store/slices/product-listing-page-slices/filters-slice';
import CatalogModal from '../components/Catalog/CatalogModal';
import { showToast } from '../components/ToastNotificationNew';
import AddtoCartModal from '../components/ProductListingComponents/products-data-view/AddtoCartModal';

const ProductCard = (props: ProductCardProps) => {
  const {
    key,
    name,
    in_stock_status,
    url,
    img_url,
    display_tag,
    item_name,
    currency_symbol,
    price,
    mrp_price,
    item_slug,
    wishlistData,
    currency_state_from_redux,
    // query,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
    min_order_qty,
  } = props;

  let wishproducts: any;
  let requestNew: any;
  let requestList: any;
  const router = useRouter();
  console.log(router, 'router45 ');
  const dispatch = useDispatch();
  const tokens = useSelector(get_access_token);
  let isLoggedIn: any;
  const filters_state_from_redux: any = useSelector(filters_selector_state);
  const [addToCartButtonDisabled, setAddToCartButtonDisabled] = useState(false);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [qty, setQty] = useState<any>(1);
  const { query }: any = useRouter();
  console.log('delete que', query);
  const newSlug = query?.category?.replace(/-/g, ' ');
  console.log(newSlug, ' newSlug');
  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }
  const handleAddCart = async () => {
    setAddToCartButtonDisabled(true);
    const addCartData = [];
    addCartData.push({
      item_code: name,
      quantity: 1,
    });
    let AddToCartRes: any = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      tokens?.token
    );
    if (AddToCartRes.msg === 'success') {
      showToast('Item Added to cart', 'success');
      dispatch(fetchCartListing());
      setAddToCartButtonDisabled(false);
    } else {
      showToast(AddToCartRes?.error, 'error');
      setAddToCartButtonDisabled(false);
    }
  };
  const handleShow = (val: any) => {
    setshow(true);
  };
  const handleClose = () => {
    setshow(false);
  };

  const handleShowModalCart = (val: any) => {
    setshow1(true);
  };
  const handleCloseModalCart = () => {
    setshow1(false);
  };

  const handleDeleteCatalogProduct = async () => {
    const deleteApiParams = {
      token: tokens?.token,
      catalog_name: newSlug,
      item_name: name,
    };
    const deleteProductFromCatalog =
      await deleteItemFromCatalog(deleteApiParams);
    console.log(deleteProductFromCatalog, 'deleteProductFromCatalog');
    if (deleteProductFromCatalog.message.msg === 'success') {
      // dispatch(successmsg(deleteProductFromCatalog?.message?.data));
      showToast(deleteProductFromCatalog?.message?.data, 'success');

      setTimeout(() => {
        const storeUsefulParamsForFurtherProductListingApi = {
          router_origin: router.route.split('/')[1],
          url_params: query,
          filterDoctype: filters_state_from_redux?.doctype,
          filterDocname: filters_state_from_redux?.docname.toLowerCase(),
          token: tokens.token,
        };
        console.log(
          storeUsefulParamsForFurtherProductListingApi,
          'storeUsefulParamsForFurtherProductListingApi'
        );

        dispatch(
          ProductListingThunk({
            storeUsefulParamsForFurtherProductListingApi,
          }) as any
        );
      }, 1000);
    } else {
      showToast(deleteProductFromCatalog?.message?.error, 'error');
    }
  };

  return (
    <>
      <div key={key} className="border p-3 h-100">
        <div className="d-flex justify-content-between icon-container-ps ">
          <div
            className={`badge text-bg-primary fs-5 display_tag_badge ms-0 ${
              display_tag.length > 0 && display_tag[0] ? 'visible' : 'invisible'
            }`}
          >
            {display_tag.length > 0 && display_tag[0]}
          </div>

          {CONSTANTS.DISPLAY_WISHLIST_ICON_ON_PRODUCT_LISTING_CARD && (
            <div className="mb-0 mt-0 pb-0 pt-0">
              {wishlistData?.map((values: any) => {
                if (values.name === name) {
                  wishproducts = values?.name;
                }
              })}
              {!wishproducts ? (
                <>
                  {isLoggedIn === 'true' ? (
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        requestNew = {
                          prod_id: name,
                          getWishlist: false,
                          deleteWishlist: false,
                          addTowishlist: true,
                          token: tokens?.token,
                        };
                        requestList = {
                          getWishlist: true,
                          deleteWishlist: false,
                          addTowishlist: false,
                          token: tokens?.token,
                        };
                        dispatch(fetchWishlistUser(requestNew));

                        setTimeout(() => {
                          dispatch(fetchWishlistUser(requestList));
                        }, 900);
                      }}
                    >
                      <i
                        className="fa fa-heart-o text-danger fs-1 "
                        aria-hidden="true"
                        data-bs-toggle="tooltip"
                        title="Add to Wishlist"
                      ></i>
                    </a>
                  ) : (
                    <Link href="/login" legacyBehavior>
                      <a style={{ cursor: 'pointer' }}>
                        <i
                          className="fa fa-heart-o text-danger fs-1 "
                          aria-hidden="true"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        ></i>
                      </a>
                    </Link>
                  )}
                </>
              ) : (
                <a
                  className="icon_pointer"
                  onClick={() => {
                    requestNew = {
                      prod_id: name,
                      getWishlist: false,
                      deleteWishlist: true,
                      addTowishlist: false,
                      token: tokens?.token,
                    };
                    requestList = {
                      getWishlist: true,
                      deleteWishlist: false,
                      addTowishlist: false,
                      token: tokens?.token,
                    };
                    dispatch(fetchWishlistUser(requestNew));

                    setTimeout(() => {
                      dispatch(fetchWishlistUser(requestList));
                    }, 900);
                  }}
                >
                  <i
                    className="fa fa-heart text-danger fs-1 "
                    aria-hidden="true"
                    data-bs-toggle="tooltip"
                    title="Added to Wishlist"
                  ></i>
                </a>
              )}
            </div>
          )}
        </div>
        <div className="product">
          <div className="product_img product-media mt-2">
            {img_url !== '' ? (
              <>
                <Link
                  href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                >
                  <Image
                    loader={() => `${CONSTANTS.API_BASE_URL}${img_url}`}
                    src={`${CONSTANTS.API_BASE_URL}${img_url}`}
                    alt="product-detail"
                    width={200}
                    height={200}
                    className="product_img_mob img-fluid"
                  />
                </Link>
              </>
            ) : (
              <div>
                <Link href={url}>
                  <Image
                    src={'/assets/images/maximaCard.jpg'}
                    alt="Product"
                    width="200"
                    height="200"
                    className="product_img_mob"
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="product-content  pt-0">
            <h4 className="product-name truncate-overflow products-name products-name-font pt-0">
              <Link
                href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                className="products-name products-name-font"
              >
                {item_name}
              </Link>
            </h4>
            <div className="product-price products-name pt-0 mt-0 product-grid-name pb-0 mb-0">
              {CONSTANTS.DISPLAY_PRODUCT_PRICE_ON_PRODUCT_LISTING_CARD && (
                <>
                  <ins className="new-price price_font_family pt-0">
                    {currency_symbol}
                    {price}
                  </ins>
                  <del className="old-price price_font_family product-font-family">
                    {currency_symbol}
                    {mrp_price}
                  </del>
                </>
              )}
              {CONSTANTS.DISPLAY_ADD_CART_BUTTON_ON_PRODUCT_LISTING_CARD && (
                <>
                  {isLoggedIn === 'true' ? (
                    <>
                      <button
                        type="button"
                        className={` ${
                          addToCartButtonDisabled === true ? 'disabled' : ''
                        } btn btn-primary ml-3 cart_btn_gtag listing-cartbtn blue-icon-color`}
                        onClick={handleShowModalCart}
                      >
                        <i
                          className="fa fa-shopping-cart d-flex justify-content-center"
                          aria-hidden="true"
                        ></i>
                      </button>
                      {/* <button
                className="btn  standard_button py-3 add-cart-btns"
                onClick={handleAddCart} style={{border:"2px solid red"}}
                >
                {selectedMultiLangData?.add_to_cart}
              </button> */}
                    </>
                  ) : (
                    <button
                      className="btn btn-primary ml-3 cart_btn_gtag listing-cartbtn"
                      // onClick={handleAddCart}
                    >
                      <Link href="/login" className="text-white ">
                        <i
                          className="fa fa-shopping-cart d-flex justify-content-center"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      {/* {selectedMultiLangData?.add_to_cart} */}
                    </button>
                  )}
                </>
              )}

              {CONSTANTS.DISPLAY_ADD_CATALOG_BUTTON_ON_PRODUCT_LISTING_CARD && (
                <>
                  {isLoggedIn === 'true' && (
                    <>
                      {router.route !== '/catalog/[category]' ? (
                        <button
                          type="button"
                          className={`btn btn-link catalog-btn-size pt-5 fs-5 products-name `}
                          onClick={() => handleShow(name)}
                        >
                          <span className="bold">
                            {selectedMultiLangData?.add_to_catalog}
                          </span>
                        </button>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </>
              )}

              {router.route === '/catalog/[category]' ? (
                <button
                  type="button"
                  className={` btn btn-primary ml-3 cart_btn_gtag listing-cartbtn blue-icon-color`}
                  onClick={handleDeleteCatalogProduct}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <CatalogModal
          show={show}
          toHide={handleShow}
          name={name}
          handleClose={handleClose}
          catalogListItem={catalogListItem}
          handleAddProduct={handleAddProduct}
          handleSubmitCatalogName={handleSubmitCatalogName}
          handleChange={handleChange}
          selectedMultiLangData={selectedMultiLangData}
        />
      </div>

      <AddtoCartModal
        show={show1}
        toHide={() => setshow1(false)}
        name={name}
        item_name={item_name}
        handleClose={handleCloseModalCart}
        handleAddCart={handleAddCart}
        min_order_qty={min_order_qty}
        qty={qty}
        setQty={setQty}
      />
    </>
  );
};

export default ProductCard;
