import React from 'react';

const CreateCatalog = ({
  handleChange,
  handleSubmitCatalogName,
  selectedMultiLangData,
}: any) => {
  return (
    <>
      <div className="d-flex justify-content-start ">
        <div className="col-lg-7 text-start">
          <div className="row mx-auto">
            <div className=" text-start page_heading p-0 ">
              <h4 className=" p-0 m-0 ">
                {selectedMultiLangData?.create_catalog}
              </h4>
            </div>

            <div className="col-lg-8 col-12 p-0">
              <input
                type="text"
                className="form-control catalog-inputBox  px-3"
                id="catalog-name"
                onChange={handleChange}
                placeholder="Enter Catalog Name"
              />
            </div>
            <div className="col-lg-4 col-12 mt-lg-0 mt-3 text-lg-center ">
              <button
                type="submit"
                className="btn createCatalog-btn "
                onClick={handleSubmitCatalogName}
              >
                {selectedMultiLangData?.create_catalog}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCatalog;
