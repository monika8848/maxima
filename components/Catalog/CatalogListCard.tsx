import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { CONSTANTS } from '../../services/config/app-config';

const CatalogListCard = ({
  catalogListItem,
  handleDeleteCatalog,
  name,
  currency_state_from_redux,
  selectedMultiLangData,
}: any) => {
  console.log(name, 'CatalogName');
  const dispatch = useDispatch();
  const tokens = useSelector(get_access_token);
  const token = tokens.token;

  console.log(catalogListItem, 'catalogListItem');
  return (
    <>
      {/* <div className="row mt-5 mb-0 d-flex justify-content-center mx-auto pb-0 mobile-version">
        <div className="col-12 catalog-wrapper text-center  ">
          <h4 className="text-captilize pb-2 color-black fs-20">
            {selectedMultiLangData?.catalog_list}
          </h4>

          {catalogListItem?.length > 0 &&
            catalogListItem?.map((catalog: any, i: any) => (
              <div className="col-md-12 col-lg-12 mt-4 mb-0  " key={i}>
                <div className="card catalogListing-card rounded-3 mb-5">
                  <div className="card-header catalogListing-cardHeader d-flex justify-content-between">
                    <h5 className="text-uppercase catalog-heading">
                      {catalog?.name}
                    </h5>
                    <p className="card-text d-inline-flex">
                      {selectedMultiLangData?.product_count} :
                      <span className="catalog-count ps-5">
                        {catalog?.product_counts > 10
                          ? catalog?.product_counts
                          : `0${catalog?.product_counts}`}
                      </span>
                    </p>
                  </div>
                  <div className="row card-body ">
                    <div className="col-lg-5 col-md-4">
                      <Link
                        href={`/${catalog.url}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                        className="btn btn-catalogview btn-colors mr-2"
                      >
                        {selectedMultiLangData?.view_catalog_product}
                        <i className="fa fa-eye px-3" aria-hidden="true"></i>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-4 my-lg-0 my-md-0 my-3 ">
                      <Link
                        href={`/product-category/?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                        className="btn btn-catalogAddProduct mr-2 text-dark "
                      >
                        {selectedMultiLangData?.add_product}
                        <i className="fa fa-plus px-3" aria-hidden="true"></i>
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <button
                        className="btn btn-catalogview btn-colors mr-lg-5"
                        onClick={() => handleDeleteCatalog(catalog?.name)}
                      >
                        {selectedMultiLangData?.delete_catalog}
                        <i
                          className="fa fa-trash-o px-3"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}

      <div className=" mt-5 ps-1 ">
        <h4 className="text-captilize pb-2 color-black fs-20">
          {selectedMultiLangData?.catalog_list}
        </h4>
        <div className="ps-3">
          <div className="row cart_heading_bg my-auto products-name py-2 ">
            <div className=" col-12 d-lg-block  products-name">
              <div className="row text-center products-name product-captilise">
                {/* <div className="col-2">Sr No.</div> */}
                <div className="col-lg-3 col-md-6">Catalog Name</div>
                <div className="col-lg-2 col-md-5">
                  Product Count
                  {/* {selectedMultiLangData?.product_count}  */}
                </div>
                <div className="col-lg-7 col-md-1">{/* Catalog Product */}</div>
                {/* <th scope="col"></th> */}
              </div>
            </div>
          </div>
          {catalogListItem?.length > 0 &&
            catalogListItem?.map((catalog: any, i: any) => (
              <>
                <div className="row products-name py-2 card ">
                  <div className="col-12   products-name">
                    <div className="d-lg-block ">
                      <div className="row text-center cart_wrapper-detail">
                        {/* <div className="col-2">{i + 1}</div> */}
                        <div className="col-lg-3 col-md-6 text-capitalize pt-2">
                          {' '}
                          {catalog?.name}
                        </div>
                        <div className="col-lg-2 col-md-6 pt-2">
                          {' '}
                          {catalog?.product_counts > 10
                            ? catalog?.product_counts
                            : `0${catalog?.product_counts}`}
                        </div>
                        <div className="col-xl-7 col-lg-12 col-md-12 ">
                          {' '}
                          <div className="row">
                            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 ">
                              <Link
                                href={`/${catalog.url}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                                className="btn btn-catalogview btn-colors btn-font"
                              >
                                {selectedMultiLangData?.view_catalog_product}
                                <i
                                  className="fa fa-eye px-3"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            </div>
                            {/* </div> */}
                            {/* <td> */}{' '}
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                              <Link
                                href={`/product-category/?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                                className="btn btn-catalogAddProduct text-dark btn-font "
                              >
                                {selectedMultiLangData?.add_product}
                                <i
                                  className="fa fa-plus px-3"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            </div>
                            {/* </td> */}
                            {/* <td> */}
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-end">
                              <button
                                className="btn btn-catalogview btn-colors btn-font"
                                onClick={() =>
                                  handleDeleteCatalog(catalog?.name)
                                }
                              >
                                {selectedMultiLangData?.delete_catalog}
                                <i
                                  className="fa fa-trash-o px-3"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                          {/* </td>{' '} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default CatalogListCard;
