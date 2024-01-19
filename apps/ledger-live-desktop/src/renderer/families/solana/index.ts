import accountHeaderManageActions from "./AccountHeaderManageActions";
import AccountBodyHeader from "./AccountBodyHeader";
import AccountSubHeader from "./AccountSubHeader";
import sendRecipientFields from "./SendRecipientFields";
import AccountBalanceSummaryFooter from "./AccountBalanceSummaryFooter";
import StakeBanner from "./StakeBanner";
import sendAmountFields from "./SendAmountFields";
import { SolanaFamily } from "./types";
import operationDetails from "./operationDetails";

const family: SolanaFamily = {
  accountHeaderManageActions,
  AccountBodyHeader,
  AccountSubHeader,
  sendRecipientFields,
  AccountBalanceSummaryFooter,
  StakeBanner,
  operationDetails,
  sendAmountFields,
};

export default family;
