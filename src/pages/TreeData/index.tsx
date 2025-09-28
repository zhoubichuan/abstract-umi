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
        setState({
            item: {
                type: "create",
                title: "创建",
                key: "create",
                item: { key: "create" },
            }
        })
        sliderRightRef?.current?.handleCreate()
    }
    const handleSearch = (params) => {
        tableShowRef?.current?.search(params)
    }
    const handleView = item => {
        setState({
            item: {
                type: 'view',
                title: item.name,
                key: 'create',
                item: item,
            }
        })
        sliderRightRef?.current?.handleCreate()
    };
    const handleEdit = item => {
        setState({
            item: {
                type: 'edit',
                title: item.name,
                key: 'create',
                item: item,
            }
        })
        sliderRightRef?.current?.handleCreate()
    };
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
                <TableShow ref={tableShowRef} edit={handleEdit} view={handleView} />
            </div>
            <ThemeContext.Provider value={state}>
                <SliderRight ref={sliderRightRef} />
            </ThemeContext.Provider>
        </div>
    );
}

export default App;