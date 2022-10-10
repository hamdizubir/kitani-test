import axios from "axios";
import React from "react";
import "./App.css";

import {
  Container,
  ProductListContainer,
  ProductContainer,
  ProductDetail,
  ButtonContainer,
  Button,
  ProductImage,
  ProductText,
  EditProductContainer,
  SubmitButton,
} from "./styled";

const apiKey =
  "36ae11cca498fd1f0011ec4a6d60431bbdde66490e323cfa0a7cd0ffc998c7e4";

// NOTE: Read Developers note on readme.md
// const getAPIKey = async (setApiKey) => {
//   const params = JSON.stringify({
//     email: 'hamdizubir@gmail.com',
//   });
//   try {
//     const res = await axios.post(
//       `https://talent-workspace.kitani.co:8443/register`,
//       params,
//       {
//         headers: {
//           Accept: "*/*",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return setApiKey(res.data.x_api_key)
//   } catch (error) {
//     throw error;
//   }
// };
const getProducts = async (setProducts, setProductsError, setIsLoading) => {
  setIsLoading(true);
  try {
    const res = await axios.get(
      "https://talent-workspace.kitani.co:8443/product",
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      }
    );
    setIsLoading(false);
    if (res.data.code && res.data.code !== 200) {
      return setProductsError(true);
    }
    return setProducts(res.data.data);
  } catch (error) {
    if (error.response.data.code && error.response.data.code === 400) {
      setProductsError(true);
    }
    setIsLoading(false);
    throw error;
  }
};

const handleSubmit = async (amount, sku_code, isAdd, setSubmitResponse) => {
  const params = JSON.stringify({
    amount: parseInt(amount),
  });

  try {
    const res = await axios.post(
      `https://talent-workspace.kitani.co:8443/product/${sku_code}/${
        isAdd ? "add" : "deduct"
      }-stock`,
      params,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      }
    );
    console.log("🚀 ~ file: App.js ~ line 111 ~ handleSubmit ~ res", res);
    return setSubmitResponse({
      code: res.data.code,
      msg: res.data.msg,
    });
  } catch (error) {
    if (error.response.data.code && error.response.data.code === 400) {
      setSubmitResponse({
        code: error.response.data.code,
        msg: error.response.data.msg,
      });
    }
    throw error;
  }
};

function App() {
  // NOTE: Read Developers note on readme.md
  // const [apiKey, setApiKey] = React.useState();
  const [products, setProducts] = React.useState();
  const [productsError, setProductsError] = React.useState(false);
  const [editAmount, setEditAmount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorDeduct, setIsErrorDeduct] = React.useState(false);
  const [isShowEditProduct, setIsShowEditProduct] = React.useState({
    isShow: false,
    isAdd: false,
    product: null,
  });
  const [submitResponse, setSubmitResponse] = React.useState({
    code: null,
    msg: null,
  });

  const handleClickEditButton = (isAdd, product) => () => {
    setIsShowEditProduct({
      isShow: true,
      isAdd: isAdd,
      product: product,
    });
  };

  const handleChangeQuantity = (quantity, isAdd, currentAmount) => {
    setEditAmount(quantity);
    if (!isAdd && quantity > currentAmount) {
      setIsErrorDeduct(true);
    } else {
      setIsErrorDeduct(false);
    }
  };

  const handleOkButton = () => () => {
    setIsShowEditProduct({
      isShow: false,
      isAdd: false,
      product: null,
    });
    setSubmitResponse({
      code: null,
      msg: null,
    });
    getProducts(setProducts, setProductsError, setIsLoading);
  };

  React.useEffect(() => {
    // NOTE: Read Developers note on readme.md
    // getAPIKey(setApiKey)
    if (!isShowEditProduct.isShow) {
      getProducts(setProducts, setProductsError, setIsLoading);
    }
  }, []);

  return (
    <Container>
      {isLoading && <h1>Loading products...</h1>}
      {productsError && <h1>Get products failed</h1>}
      <ProductListContainer>
        {!isShowEditProduct.isShow &&
          products &&
          products.map((item, index) => (
            <ProductContainer key={index}>
              <ProductDetail>
                <ProductImage src={item.sku_img} />
                <ProductText>
                  <h4 style={{ margin: 0, color: "gray" }}>{item.sku_code}</h4>
                  <h3 style={{ margin: 0, fontWeight: "bold" }}>
                    {item.sku_name}
                  </h3>
                  <h5 style={{ margin: 0 }}>Qty: {item.amount}</h5>
                </ProductText>
              </ProductDetail>
              <ButtonContainer>
                <Button
                  style={{ backgroundColor: "green" }}
                  onClick={handleClickEditButton(true, item)}
                >
                  <h2 style={{ margin: 0 }}>Add</h2>
                </Button>
                {item.amount > 0 && (
                  <Button
                    style={{ backgroundColor: "orange" }}
                    onClick={handleClickEditButton(false, item)}
                  >
                    <h2 style={{ margin: 0 }}>Deduct</h2>
                  </Button>
                )}
              </ButtonContainer>
            </ProductContainer>
          ))}
        {isShowEditProduct.isShow && isShowEditProduct.product && (
          <EditProductContainer>
            <h3 style={{ margin: 0, fontWeight: "bold" }}>
              {isShowEditProduct.isAdd ? "Add Stock" : "Deduct Stock"}
            </h3>
            <h4 style={{ margin: 0, color: "gray" }}>
              {isShowEditProduct.product.sku_code}
            </h4>
            <h3 style={{ margin: 0, fontWeight: "bold" }}>
              {isShowEditProduct.product.sku_name}
            </h3>
            {submitResponse.code ? (
              <h5>{submitResponse.msg}</h5>
            ) : (
              <>
                <label htmlFor="amount">Amount</label>
                <input
                  style={{
                    height: "40px",
                  }}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  onChange={(e) =>
                    handleChangeQuantity(
                      e.target.value,
                      isShowEditProduct.isAdd,
                      isShowEditProduct.product.amount
                    )
                  }
                />
              </>
            )}
            {isErrorDeduct && (
              <h5 style={{ margin: 0, fontWeight: "bold", color: "red" }}>
                Deduct amount bigger than current amount
              </h5>
            )}
            {submitResponse.code ? (
              <SubmitButton
                style={{
                  backgroundColor:
                    submitResponse.code === 200 ? "green" : "orange",
                  cursor: "pointer",
                }}
                onClick={handleOkButton()}
              >
                OK
              </SubmitButton>
            ) : (
              <SubmitButton
                style={{
                  backgroundColor: isShowEditProduct.isAdd ? "green" : "orange",
                  cursor:
                    editAmount > 0 && !isErrorDeduct
                      ? "pointer"
                      : "not-allowed",
                }}
                onClick={
                  editAmount > 0 && !isErrorDeduct
                    ? () =>
                        handleSubmit(
                          editAmount,
                          isShowEditProduct.product.sku_code,
                          isShowEditProduct.isAdd,
                          setSubmitResponse
                        )
                    : null
                }
              >
                Submit
              </SubmitButton>
            )}
          </EditProductContainer>
        )}
      </ProductListContainer>
    </Container>
  );
}

export default App;
