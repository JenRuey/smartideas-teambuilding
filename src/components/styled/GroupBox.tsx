import styled from "styled-components";

export const GBox = styled.div`
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  padding: 20px;
  background: white;
  height: 180px;
  border-radius: 10px;
  color: black;
  .hfont {
    font-weight: bold;
  }
  .sfont {
    font-size: 11px;
    color: gray;
  }
  .member-dot {
    background: black;
    color: white;
    border-radius: 5px;
    padding: 4px;
    margin-right: 4px;
    display: inline-block;
  }
  :hover {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 60%), 0 1px 3px 1px rgb(60 64 67 / 30%);
  }

  position: relative;
  .top-right-float {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
  }
`;
