import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #addaec;
  width: auto;
  height: 800px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Main = styled.main`
  width: 100%;
  max-width: 600px;
`;

const SpendingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Home = () => {
  const [spendings, setSpendings] = useState([]);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedSpendings = JSON.parse(localStorage.getItem("spendings"));
    if (storedSpendings) {
      setSpendings(storedSpendings);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("spendings", JSON.stringify(spendings));
  }, [spendings]);

  const dateInput = (e) => {
    setDate(e.target.value);
  };

  const categoryInput = (e) => {
    setCategory(e.target.value);
  };

  const amountInput = (e) => {
    setAmount(e.target.value);
  };

  const contentInput = (e) => {
    setContent(e.target.value);
  };

  const addSpendingsHandler = () => {
    const newSpending = {
      id: new Date().getTime(),
      date: date,
      category: category,
      amount: amount,
      content: content,
    };
    setSpendings([...spendings, newSpending]);
  };

  const navigateToDetail = (id, spendings) => {
    navigate(`/detail/${id}`, { state: { spendings } });
  };

  return (
    <HomeContainer>
      <Header>
        <Input
          type="text"
          value={date}
          onChange={dateInput}
          placeholder="날짜"
        />
        <Input
          type="text"
          value={category}
          onChange={categoryInput}
          placeholder="항목"
        />
        <Input
          type="text"
          value={amount}
          onChange={amountInput}
          placeholder="금액"
        />
        <Input
          type="text"
          value={content}
          onChange={contentInput}
          placeholder="내용"
        />
        <Button onClick={addSpendingsHandler}>추가</Button>
      </Header>
      <Main>
        {spendings.map((spending) => (
          <SpendingItem
            key={spending.id}
            onClick={() => navigateToDetail(spending.id, spendings)}
          >
            <div>
              날짜: {spending.date} | 항목: {spending.category} | 금액:{" "}
              {spending.amount}
            </div>
            <div>내용: {spending.content}</div>
          </SpendingItem>
        ))}
      </Main>
    </HomeContainer>
  );
};

export default Home;
