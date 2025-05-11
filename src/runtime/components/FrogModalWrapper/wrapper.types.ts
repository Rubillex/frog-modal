export enum FrogModalWrapperPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  FULL = "full",
}

export type FrogModalWrapperProps = {
  desktopPosition?: FrogModalWrapperPosition;
  mobilePosition?: FrogModalWrapperPosition;
  mobileSwipeToClose?: boolean;
  headerWrapperClass?: string;
};
