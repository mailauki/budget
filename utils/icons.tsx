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

export function getCategoryIcon(category: string) {
  let icon = <BsCurrencyDollar size={18} />;

  switch (category) {
    case "Income":
      icon = <BsCashStack size={18} />;
      break;
    case "Housing":
      icon = <BsHouse size={18} />;
      break;
    case "Bills & Utilities":
      icon = <BsCreditCard2Back size={18} />;
      break;
    case "Food & Dining":
      icon = <BsCupHot size={18} />;
      break;
    case "Lifestyle":
      icon = <BsRocketTakeoff size={18} />;
      break;
    case "Shopping":
      icon = <BsCart2 size={18} />;
      break;
    case "Health & Wellness":
      icon = <BsHeartPulse size={18} />;
      break;
    case "Other":
      icon = <BsQuestionLg size={18} />;
      break;
    case "Debt":
      icon = <BsMortarboard size={18} />;
      break;
    case "Savings":
      icon = <BsPiggyBank size={18} />;
      break;
    default:
      icon = <BsCurrencyDollar size={18} />;
      break;
  }

  return icon;
}

export function getGoalIcon(name: string) {
  let icon = <BsCurrencyDollar size={18} />;

  if (name.toLowerCase().includes("loan")) icon = <BsBank size={18} />;
  else if (
    name.toLowerCase().includes("home") ||
    name.toLowerCase().includes("house")
  )
    icon = <BsHouse size={18} />;
  else icon = <BsCurrencyDollar size={18} />;

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
