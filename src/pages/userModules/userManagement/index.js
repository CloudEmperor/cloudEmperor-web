import React from 'react'
import './index.less'
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import API from '../../../api'
import { get, del } from '../../../service/request'
import { Button, Table, message, Modal } from 'antd'
import { formatDate } from '../../../utils/utils'

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            deleteId: '',
            deleteMsg: '',
            pagination: {
                current: 1,
                pageSize: 15,
                showQuickJumper: true,
                pageSizeOptions: ['15', '30', '60', '100'],
                showSizeChanger: true,
                total: 0
            },
            tableData: [],
            columns: [
                {
                    title: '序号',
                    width: 60,
                    dataIndex: 'index',
                    render: (str, record, index) => {
                        return index + 1
                    }
                },
                {
                    title: '姓名',
                    dataIndex: 'title'
                },
                {
                    title: '角色',
                    dataIndex: 'summary'
                },
                {
                    title: '创建者',
                    width: 170,
                    dataIndex: 'createBy'
                },
                {
                    title: '创建时间',
                    width: 170,
                    render: record => {
                        return formatDate(record.createDate, 'yyyy-MM-dd hh:mm')
                    }
                },
                {
                    title: '操作',
                    width: 200,
                    render: record => {
                        return this.renderActions({ record })
                    }
                }
            ]
        }
    }
    componentDidMount() {
        //this.initData()
    }
    initData = () => {
        const postData = {
            page: this.state.pagination.current,
            rows: this.state.pagination.pageSize,
            catalogId: 1
        }
        get(API.new.list(), postData).then(res => {
            if (res.status === 200) {
                const pager = { ...this.state.pagination }
                pager.total = res.data.total
                this.setState({
                    tableData: res.data.list || [],
                    pagination: pager
                })
            } else {
                message.error(res.message)
            }
        })
    }
    rowEdit = id => {
        this.props.history.push({
            pathname: '/editContent',
            search: queryString.stringify({
                type: 'edit',
                id: id
            })
        })

    }
    rowDel = row => {
        this.setState({
            deleteId: row.id,
            deleteMsg: row.title,
            visible: true
        });
    }
    rowStick = row => {
        if (row.top === 1) {
            message.warning('已置顶，请勿重复操作！');
            return
        }
        get(API.new.uptop(), { id: row.id, top: '1' }).then(res => {
            if (res.status === 200) {
                message.success('置顶成功')
                this.initData()
            } else {
                message.error(res.message)
            }
        })
    }
    handleOk = () => {
        del(API.new.delete(), { id: this.state.deleteId }).then(res => {
            if (res.status === 200) {
                message.success('删除成功')
                this.initData()
            } else {
                message.error(res.message)
            }
        })

        this.setState({
            visible: false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
        });
        setTimeout(() => {
            this.initData()
        })
    }

    renderActions = ({ record }) => {
        return (
            <div>
                <span onClick={() => { this.rowEdit(record.id) }} className="text-edit">修改</span>
                <span onClick={() => { this.rowDel(record) }} className="text-del gap">删除</span>
                <span onClick={() => { this.rowStick(record) }} className="text-stick">{record.top === 1 ? '已置顶' : '置顶'}</span>
            </div>
        )
    }
    render() {
        return (
            <div className="user">
                <div className="user-handle">
                    <Button type="primary">新增</Button>
                </div>
                <Table
                    columns={this.state.columns}
                    rowKey="id"
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    dataSource={this.state.tableData} />
                <Modal
                    title="友情提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{`您确定要删除《${this.state.deleteMsg}》吗？`}</p>
                </Modal>
            </div>
        )
    }
}

export default withRouter(UserManagement)