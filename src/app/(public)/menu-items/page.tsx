import { Suspense } from "react";
import MenuItemsContainers from "./_components/MenuItemsContainers";
import Container from "@/components/ui/container";

const MenuItemsPage = () => {
  return (
    <Container className="page-padding">
      <Suspense fallback={null}><MenuItemsContainers></MenuItemsContainers></Suspense>
    </Container>
  );
};

export default MenuItemsPage;
