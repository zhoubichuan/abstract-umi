import React from "react"
import { GlobalTheSlider } from "./GlobalTheSlider"

/** tagManager 右侧区域入口，透传关闭页签回调。 */
type SliderRightProps = {
  handleCloseTabs?: () => void
}

export const SliderRight: React.FC<SliderRightProps> = ({ handleCloseTabs }) => {
  return <GlobalTheSlider handleCloseTabs={handleCloseTabs}></GlobalTheSlider>
}
