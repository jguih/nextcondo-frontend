import { AppDrawer } from "@/components/ui/app-drawer";
import { Button, Sheet } from "@mui/joy";

const Home = () => {
  return (
    <>
      <Sheet sx={{ height: "100vh" }}>
        <Button>Hey</Button>
      </Sheet>
      <AppDrawer />
    </>
  );
};

export default Home;
