<template>
  <div id="table-data">
    <Row>
      <Col span="11">
      <Card>
        <table-left />
      </Card>
      </Col>
      <Col span="13">
        <table-right />
      </Col>
    </Row>
  </div>
</template>

<script>
import TableLeft from './tableL'
import TableRight from './tableR'
export default {
  components: { TableLeft, TableRight }
}
</script>

<style lang="stylus">
#table-data {
  margin: 5px;
}
</style>
