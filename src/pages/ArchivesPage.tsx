import { Flex, Grid, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { VscSettings, VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import Circular from "../components/Abstracts/Circular";
import CustomBadge from "../components/Badge/CustomBadge";
import CustomIconButton from "../components/Button/CustomIconButton";
import CollectionCard from "../components/Card/CollectionCard";
import { selectCurrentWallet } from "../features/auth/authSlice";
import { selectToken } from "../features/market/marketSlice";

const ArchivesPage = () => {
  const contract = useSelector(selectToken);
  const wallet = useSelector(selectCurrentWallet);
  const [archives, setArchives] = useState<any>([]);
  const [token, setToken] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);

  const loadListing = async () => {
    const listing = await token._getTokens(wallet);
    console.log(listing);
    setArchives(listing);
  };

  const loadContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = await new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );
    setToken(tokenContract);
  };

  useEffect(() => {
    if (contract) {
      setFlag(true);
    }
  }, [contract]);

  useEffect(() => {
    if (flag) {
      loadContract();
    }
  }, [flag]);

  useEffect(() => {
    if (token) {
      loadListing();
    }
  }, [token]);

  return (
    <Grid
      height={"full"}
      width={"full"}
      gridTemplateColumns={"20% 2fr"}
      gridTemplateRows={"200px  1fr"}
      rowGap={"50px"}
      p={"30px"}
      position={"relative"}
      zIndex={2}
    >
      <Flex
        px={"90px"}
        w={"full"}
        gridColumn={"span 2"}
        position={"relative"}
        zIndex={3}
        gap={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Circular top="-200" left={"-180"} zIndex={-4} />
        <Flex>
          <Text fontSize={"95px"} fontWeight={"600"} color={"buttonHover"}>
            Archives
          </Text>
          <Flex>
            <CustomBadge text="stash" color="orangeDark" bg="orangeLight" />
          </Flex>
        </Flex>

        <Flex gap={4} height={"full"} alignItems={"end"} pb={"40px"}>
          <CustomIconButton
            aria="filter"
            color="gray.200"
            icon={<VscAdd size={"25px"} />}
            type={"outline"}
            onClick={() => {}}
          />
          <CustomIconButton
            aria="filter"
            color="gray.200"
            icon={<VscSettings size={"25px"} />}
            type={"outline"}
            onClick={() => {}}
          />
        </Flex>
      </Flex>

      <Flex
        gap={10}
        width={"full"}
        wrap={"wrap"}
        alignItems={"center"}
        gridColumn={"span 2"}
        position={"relative"}
        zIndex={3}
        justifyContent={"center"}
      >
        {archives.map((archive: any) => {
          return <CollectionCard key={archive._id} />;
        })}
      </Flex>
    </Grid>
  );
};

export default ArchivesPage;
