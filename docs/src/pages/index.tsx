import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import GraphQLSvg from "@site/static/img/graphql.svg";
import KotlinDarkSvg from "@site/static/img/kotlin-dark-mode.svg";
import KotlinLightSvg from "@site/static/img/kotlin-light-mode.svg";
import CodeBlock from "@theme/CodeBlock";
import { useColorMode } from "@docusaurus/theme-common";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          A{" "}
          <Link
            target="_blank"
            className="link"
            to="https://the-guild.dev/graphql/codegen"
          >
            graphql-codegen
          </Link>{" "}
          plugin that enables schema-first development with{" "}
          <Link
            target="_blank"
            className="link"
            to="https://opensource.expediagroup.com/graphql-kotlin/docs/"
          >
            graphql-kotlin
          </Link>
          .
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main className="main">
        <section>
          <GraphQLSvg height={100} />
          <CodeBlock language="graphql" title="input.graphql">
            {`"A description for MyType"
type MyType {
  "A description for myField"
  myField: String!
  deprecatedField: String
    @deprecated(reason: "Use something else instead")
}`}
          </CodeBlock>
        </section>
        <section>
          <KotlinLogo />
          <CodeBlock language="kotlin" title="output.kt">
            {`import com.expediagroup.graphql.generator.annotations.*

@GraphQLDescription("A description for MyInputType")
data class MyType(
    @GraphQLDescription("A description for myField")
    val myField: String,
    @Deprecated("Use something else instead")
    val deprecatedField: String? = null,
)`}
          </CodeBlock>
        </section>
      </main>
    </Layout>
  );
}

function KotlinLogo() {
  const { isDarkTheme } = useColorMode();
  const KotlinSvg = isDarkTheme ? KotlinDarkSvg : KotlinLightSvg;

  return <KotlinSvg height={75} />;
}
