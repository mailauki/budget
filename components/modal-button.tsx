import { Button, Card, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { BsPlus } from "react-icons/bs";

export default function ModalButton({
  onOpen,
  children,
}: {
  onOpen: () => void;
  children?: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <>
      {children ? (
        <Card
          isHoverable
          isPressable={path === "/transactions" || path === "/goals"}
          radius="sm"
          shadow="none"
          onPress={onOpen}
        >
          {children}
        </Card>
      ) : (
        <>
          <Button
            className="hidden sm:flex bg-foreground text-background"
            endContent={<BsPlus size={18} />}
            radius="full"
            onPress={onOpen}
          >
            Add New
          </Button>
          <div className="fixed sm:hidden bottom-0 right-0 m-6 z-20">
            <Tooltip content="Add New">
              <Button
                isIconOnly
                className="bg-foreground text-background"
                radius="full"
                size="lg"
                variant="shadow"
                onPress={onOpen}
              >
                <BsPlus size={20} />
              </Button>
            </Tooltip>
          </div>
        </>
      )}
    </>
  );
}
