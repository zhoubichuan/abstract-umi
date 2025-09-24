import React, { useState, useRef } from 'react';
import SliderRight from './SliderRight';
import SearchForm from './SearchForm';
import ButtonGroup from './ButtonGroup';
import TableShow from './TableShow';
import ThemeContext from './ThemeContext';
const App: React.FC = () => {
    const [state, setState] = useState({
        item: {
            type: "create",
            title: "创建",
            key: "create",
            item: { key: "create" },
        }
    })
    const searchFormRef = useRef(null)
    const tableShowRef = useRef(null)
    const sliderRightRef = useRef(null)
    const handleCreate = () => {
        sliderRightRef?.current?.handleCreate()
    }
    const handleSearch = (params) => {
        debugger
        tableShowRef?.current?.search(params)
    }
    return (
        <div className="common-page" style={{ padding: 8 }}>
            <div className={'common-content'}>
                {/* 搜索组件 */}
                <SearchForm ref={searchFormRef} search={handleSearch} />
                {/* 按钮组 */}
                <ButtonGroup
                    handleCreate={handleCreate}
                    handleDelete={searchFormRef?.current?.search}
                    handleExport={searchFormRef?.current?.search}
                    handleImport={searchFormRef?.current?.search}
                />
                {/* 表格部分 */}
                <TableShow ref={tableShowRef} />
            </div>
            <ThemeContext.Provider value={state}>
                <SliderRight ref={sliderRightRef} />
            </ThemeContext.Provider>
        </div>
    );
}

export default App;