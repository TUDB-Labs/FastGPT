<template>
  <div class="team-introduction content-width">
    <h4 class="middle01-title"><strong>团队介绍</strong></h4>
    <main>
      <div class="info">
        背靠“科研国家队“，拥有近十年的图数据库和AI底层技术沉淀，致力于成为国家“新兴基础设施“和“下一代人工智能“的重要组成部分。团队核心成员来自蚂蚁集团、PINTEREST、FACEBOOK、GOOGLE、LINKEDIN、微软、IBM、CLOUDERA等国际一流研究所或科技企业。多名成员是TENSORFLOW、PYTORCH、APACHE
        HADOOP、SPARK、KAFKA、KUBEFLOW、ARGO等大数据与人工智能领域极具影响力项目的PMC或活跃贡献者。
        <br /><br />
        公司依靠自研的多模态图数据库解决大模型的幻觉问题，凭借AI训练和预测引擎的优化部署和资源调度能力，打造垂直领域大模型私有化产品和解决方案。公司曾承担国家重点研发计划，国家重点实验项目，产品在国家自然科学基金委、国家烟草专卖局、“2020年工业互联网创新发展工程·工业物联网平台“、国家生物信息平台等国家级项目和多个商业场景
        (法律医疗、金融、烟草) 得到应用，年营收超千万。
      </div>
      <div class="img-box">
        <img src="@/assets/images/team-Introduction.png" alt="" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "team-introduction",
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang='less' scoped>
.team-introduction {
  // padding-top: 3rem;
  padding-bottom: 2rem;
  padding-top: 4rem;
  margin-top: -3rem;
}
.middle01-title {
  // margin-top: 1rem;
  font-size: 2rem;
}
main {
  margin-top: 1rem;
  border: 1px solid #f3f3f3;
  border-radius: 0.3rem;
  display: flex;
  // height: 18rem;
  .info {
    padding: 1.2rem;
    font-size: 0.7rem;
    flex: 1;
    text-align: left;
    line-height: 1.4rem;
  }
  .img-box {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width: 767px) {
  .team-introduction {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    background: #fff;
    padding-top: 2rem;
    margin-top: -4rem;
    .middle01-title {
      margin-top: 0rem;
    }
    main {
      flex-direction: column;
      border: none;
      margin-top: 0;
    }
  }
}
</style>