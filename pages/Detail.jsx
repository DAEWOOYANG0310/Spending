import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DetailContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #addaec;
  width: auto;
  height: 800px;
`;

const SpendingInfo = styled.p`
  margin-bottom: 20px;
  border: 1px solid black;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;
const Detail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.spendings) {
    return <div>지출 내역을 찾을 수 없습니다.</div>;
  }

  const spendingIndex = state.spendings.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (spendingIndex === -1) {
    return <div>지출 내역을 찾을 수 없습니다.</div>;
  }

  const spending = state.spendings[spendingIndex];

  const handleEdit = () => {
    // 수정 기능 구현
  };

  const handleDelete = () => {
    const storedSpendings = JSON.parse(localStorage.getItem("spendings"));
    const updatedSpendings = storedSpendings.filter(
      (item) => item.id !== spending.id
    );
    localStorage.setItem("spendings", JSON.stringify(updatedSpendings));
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <DetailContainer>
      <h2>지출 내역 상세</h2>
      <SpendingInfo>
        <p>날짜: {spending.date}</p>
        <p>항목: {spending.category}</p>
        <p>금액: {spending.amount}</p>
        <p>내용: {spending.content}</p>
      </SpendingInfo>
      <ButtonGroup>
        <Button onClick={handleEdit}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
        <Button onClick={handleGoBack}>뒤로가기</Button>
      </ButtonGroup>
    </DetailContainer>
  );
};

export default Detail;
