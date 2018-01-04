import React, { PureComponent } from 'react';
import { Table } from 'antd';

class SearchForm extends PureComponent{
  
}
renderSearchForm() {
  const { getFieldDecorator } = this.props.form;
  return (
    <Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="角色名称">
            {getFieldDecorator('name')(
              <Input placeholder="请输入名称" />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="角色状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择状态" style={{ width: '100%' }}>
                <Option value="0">正常</Option>
                <Option value="1">停用</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
        </Col>
      </Row>
    </Form>
  );
}
