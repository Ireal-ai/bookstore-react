import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  background: #F0F4EF;
  border-radius: 16px;
  max-height: 400px;
  height: 100%;
  margin-top: 100px;

  .text-block {
    max-width: 415px;
    width: 100%;
    padding-right: 108px;
    z-Index: 1;
  }

  .button {
    z-index: 1;
  }

  .info-block {
    position: relative;
  }

  .main-img {
    position: absolute;
    left: 108px;
    bottom: 0;
  }

  .background-img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export default Wrapper;
