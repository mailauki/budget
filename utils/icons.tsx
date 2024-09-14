import {
  BsArrowLeftRight,
  BsBank,
  BsCalendar4Week,
  BsCart2,
  BsCashStack,
  BsColumnsGap,
  BsCreditCard2Back,
  BsCupHot,
  BsCurrencyDollar,
  BsGear,
  BsHeartPulse,
  BsHouse,
  BsMortarboard,
  BsPiggyBank,
  BsQuestionLg,
  BsRocketTakeoff,
  BsWallet2,
} from "react-icons/bs";

export function getCategoryIcon({
  category,
  size = 18,
}: {
  category: string;
  size?: number;
}) {
  let icon = <BsCurrencyDollar size={size} />;

  switch (category) {
    case "Income":
      icon = <BsCashStack size={size} />;
      break;
    case "Housing":
      icon = <BsHouse size={size} />;
      break;
    case "Bills & Utilities":
      icon = <BsCreditCard2Back size={size} />;
      break;
    case "Food & Dining":
      icon = <BsCupHot size={size} />;
      break;
    case "Lifestyle":
      icon = <BsRocketTakeoff size={size} />;
      break;
    case "Shopping":
      icon = <BsCart2 size={size} />;
      break;
    case "Health & Wellness":
      icon = <BsHeartPulse size={size} />;
      break;
    case "Other":
      icon = <BsQuestionLg size={size} />;
      break;
    case "Debt":
      icon = <BsMortarboard size={size} />;
      break;
    case "Savings":
      icon = <BsPiggyBank size={size} />;
      break;
    default:
      icon = <BsCurrencyDollar size={size} />;
      break;
  }

  return icon;
}

export function getGoalIcon({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  let icon = <BsCurrencyDollar size={size} />;

  if (name.toLowerCase().includes("loan")) icon = <BsBank size={size} />;
  else if (
    name.toLowerCase().includes("home") ||
    name.toLowerCase().includes("house")
  )
    icon = <BsHouse size={18} />;
  else icon = <BsCurrencyDollar size={size} />;

  return icon;
}

export function getNavIcon(link: string) {
  let icon = <></>;

  switch (link) {
    case "/":
      icon = <BsColumnsGap />;
      // <BsGrid />
      // <BsGrid1X2 />
      break;
    case "/transactions":
      icon = <BsArrowLeftRight />;
      break;
    case "/budget":
      icon = <BsWallet2 />;
      // <BsCashStack />
      // <BsCreditCard2Back />
      // <BsWallet2 />
      break;
    case "/goals":
      icon = <BsPiggyBank />;
      // <BsBullseye />
      // <BsPiggyBank />
      break;
    case "/calendar":
      icon = <BsCalendar4Week />;
      break;
    case "/settings":
      icon = <BsGear />;
      break;
    default:
      icon = <></>;
      break;
  }

  return icon;
}
