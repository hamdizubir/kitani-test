import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ProductListContainer = styled.div`
  background-color: #dcfab6;
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 20%;
  height: 100%;
  align-items: center;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  border-color: black;
  background-color: white;
  border-width: 1px;
  border-style: solid;
  padding: 12px;
  gap: 12px;
`;

export const EditProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border-color: black;
  background-color: white;
  border-width: 1px;
  border-style: solid;
  padding: 12px;
  gap: 12px;
`;

export const ProductDetail = styled.div`
  height: 75%;
  display: flex;
`;
export const ButtonContainer = styled.div`
  display: flex;
  height: 25%;
  gap: 24px;
`;

export const Button = styled.div`
  display: flex;
  text-align: center;
  border-radius: 12px;
  height: 100%;
  width: 50%;
  color: white;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  `;

export const SubmitButton = styled.div`
cursor: pointer;
  display: flex;
  text-align: center;
  border-radius: 12px;
  height: 40px;
  width: 100%;
  color: white;
  align-items: center;
  justify-content: center;
`;

export const ProductImage = styled.img`
  width: 45%;
  height: 100%;
`;
export const ProductText = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -ms-box-sizing: border-box;
`;
