import styled from "styled-components";
import Button from "../Button";
import { useEffect } from "react";

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function FindAddress({ onCompleted }: Props) {
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const address = data.address as string;
        onCompleted(address);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button onClick={handleOpen} type="button" size="medium" schema="normal">
      주소 찾기
    </Button>
  );
}
const FindAddressStyle = styled.div``;

export default FindAddress;
