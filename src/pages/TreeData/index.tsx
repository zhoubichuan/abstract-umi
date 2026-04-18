import React, { useState, useRef, useEffect } from 'react';
import SliderRight from './SliderRight';
import SearchForm from './SearchForm';
import ButtonGroup from './ButtonGroup';
import TableShow from './TableShow';
import ThemeContext from './ThemeContext';

/**
 * TreeData 列表页容器：
 * 管理查询、表格以及右侧详情抽屉的状态流转。
 */
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
    /** 触发表格查询（供初始化和批量操作复用） */
    const search = (params) => {
        tableShowRef?.current?.search(params)
    }
    useEffect(() => {
        search({})
    }, [])
    /** 打开创建态抽屉 */
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
    /** 搜索表单提交回调 */
    const handleSearch = (params) => {
        tableShowRef?.current?.search(params)
    }
    /** 打开查看态抽屉 */
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
    /** 打开编辑态抽屉 */
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