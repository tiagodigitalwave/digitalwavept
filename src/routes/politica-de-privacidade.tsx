import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer, CookieBanner } from "@/components/site/Footer";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Digital Wave" },
      { name: "description", content: "Política de privacidade e tratamento de dados pessoais da Digital Wave, conforme o RGPD." },
      { property: "og:title", content: "Política de Privacidade — Digital Wave" },
      { property: "og:description", content: "Como tratamos os teus dados pessoais, em conformidade com o RGPD e a Lei n.º 58/2019." },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <div className="dark">
      <Nav />
      <main className="section pt-36 md:pt-44">
        <span className="eyebrow">Legal · RGPD</span>
        <h1 className="display mt-6">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-PT")}</p>

        <div className="mt-12 space-y-8 max-w-3xl text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl mb-3">1. Responsável pelo tratamento</h2>
            <p>
              A entidade responsável pelo tratamento dos seus dados pessoais é a <strong>Digital Wave</strong>,
              com contacto em <a href="mailto:hello@tiagodigitalwave.eu" className="text-wave underline">hello@tiagodigitalwave.eu</a>.
              Esta Política cumpre o Regulamento (UE) 2016/679 (RGPD) e a Lei n.º 58/2019, de 8 de agosto,
              que executa o RGPD na ordem jurídica nacional portuguesa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">2. Dados recolhidos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dados de contacto fornecidos voluntariamente (nome, email, empresa, cargo).</li>
              <li>Dados de navegação (endereço IP, tipo de dispositivo, browser, páginas visitadas).</li>
              <li>Dados recolhidos através de cookies, conforme a Política de Cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-3">3. Finalidades e fundamentos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Resposta a contactos e agendamento de reuniões:</strong> execução de diligências pré-contratuais (art. 6.º, n.º 1, al. b) RGPD).</li>
              <li><strong>Prestação de serviços contratados:</strong> execução do contrato.</li>
              <li><strong>Cumprimento de obrigações legais</strong> (fiscais e contabilísticas).</li>
              <li><strong>Análise de tráfego e melhoria do website:</strong> consentimento (cookies opcionais).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-3">4. Prazos de conservação</h2>
            <p>
              Os dados são conservados pelo período estritamente necessário às finalidades acima e em
              cumprimento dos prazos legais aplicáveis (designadamente 10 anos para efeitos fiscais,
              nos termos do Código do IVA e do CIRC).
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">5. Subcontratantes e transferências</h2>
            <p>
              Recorremos a subcontratantes para alojamento, envio de email e ferramentas de análise.
              Sempre que ocorram transferências internacionais de dados (por exemplo, para fora do
              Espaço Económico Europeu), garantimos a existência de salvaguardas adequadas, como
              Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">6. Direitos do titular</h2>
            <p>
              Nos termos dos artigos 15.º a 22.º do RGPD, tem direito de acesso, retificação,
              apagamento, limitação, portabilidade, oposição e a não ficar sujeito a decisões
              automatizadas. Para exercer estes direitos, contacte-nos através de{" "}
              <a href="mailto:hello@tiagodigitalwave.eu" className="text-wave underline">hello@tiagodigitalwave.eu</a>.
            </p>
            <p className="mt-3">
              Tem ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados
              (CNPD), em <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-wave underline">www.cnpd.pt</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">7. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra
              acesso não autorizado, perda ou destruição, conforme o artigo 32.º do RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">8. Alterações</h2>
            <p>
              Esta Política pode ser atualizada a qualquer momento, sendo a data da última revisão
              indicada no topo. Recomenda-se a sua consulta periódica.
            </p>
          </section>

          <p className="pt-6">
            <Link to="/" className="text-wave underline">← Voltar ao início</Link>
          </p>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
