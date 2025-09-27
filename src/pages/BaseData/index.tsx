import React, { useState, useRef, useEffect } from 'react';
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
    const search = (params) => {
        tableShowRef?.current?.search(params)
    }
    useEffect(() => {
        search({})
    }, [])
    const handleCreate = () => {
        sliderRightRef?.current?.handleCreate()
    }
    const handleSearch = (params) => {
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
                    handleDelete={search}
                    handleExport={search}
                    handleImport={search}
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