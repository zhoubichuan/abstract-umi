import React, { Fragment, useContext, useMemo, useState } from "react"
import { Tabs } from "antd"
// import { CloseOutlined } from "@ant-design/icons"
import ViewDetail from "./View/Detail"
import EditDetail from "./Edit/Detail"
import CreateDetail from "./Create/Detail"
import ThemeContext from "./ThemeContext"

type SliderItem = {
  key: string
  type: string
  title?: string
  item?: any
  categories?: any[]
  tags?: any[]
}

type GlobalTheSliderProps = {
  handleCloseTabs?: () => void
}

export const GlobalTheSlider: React.FC<GlobalTheSliderProps> = () => {
  const tabsItem = useContext(ThemeContext) as unknown as Record<string, SliderItem>
  const [activeKey, setActiveKey] = useState("")
  const ViewDetailAny = ViewDetail as any
  const EditDetailAny = EditDetail as any
  const CreateDetailAny = CreateDetail as any

  const lastKey = useMemo(() => {
    const values = Object.values(tabsItem)
    return values.length ? values[values.length - 1].key : ""
  }, [tabsItem])

  return (
    <Fragment>
      <div
        className="global-slider"
        style={{
          display: Object.values(tabsItem).length ? "block" : "none",
        }}
      >
        <Tabs
          onChange={setActiveKey}
          activeKey={activeKey || lastKey}
          type="editable-card"
          className="slider-tabs"
        >
          {Object.keys(tabsItem).map((key) => {
            const item = tabsItem[key]
            if (item.type.includes("view")) {
              return (
                <Tabs.TabPane className="slider-tabpane" tab={item.title} key={item.key}>
                  <ViewDetailAny item={item.item} categories={item.categories} tags={item.tags} />
                </Tabs.TabPane>
              )
            }
            if (item.type.includes("edit")) {
              return (
                <Tabs.TabPane className="slider-tabpane" tab={item.title} key={item.key}>
                  <EditDetailAny item={item.item} categories={item.categories} tags={item.tags} />
                </Tabs.TabPane>
              )
            }
            if (item.type.includes("create")) {
              return (
                <Tabs.TabPane className="slider-tabpane" tab={"创建模型"} key={item.key}>
                  <CreateDetailAny item={item.item} categories={item.categories} tags={item.tags} />
                </Tabs.TabPane>
              )
            }
            return null
          })}
        </Tabs>
      </div>
    </Fragment>
  )
}
