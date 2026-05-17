import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer, CookieBanner } from "@/components/site/Footer";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — Digital Wave" },
      { name: "description", content: "Termos e condições de utilização do website e serviços da Digital Wave." },
      { property: "og:title", content: "Termos e Condições — Digital Wave" },
      { property: "og:description", content: "Termos e condições de utilização do website e serviços da Digital Wave." },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  return (
    <div className="dark">
      <Nav />
      <main className="section pt-36 md:pt-44">
        <span className="eyebrow">Legal</span>
        <h1 className="display mt-6">Termos e Condições</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-PT")}</p>

        <div className="mt-12 prose-legal space-y-8 max-w-3xl text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl mb-3">1. Identificação</h2>
            <p>
              O presente website é propriedade de <strong>Digital Wave</strong>, com sede em Portugal,
              contacto através do email <a href="mailto:hello@tiagodigitalwave.eu" className="text-wave underline">hello@tiagodigitalwave.eu</a>
              (doravante "Digital Wave", "nós" ou "empresa").
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">2. Objeto</h2>
            <p>
              Os presentes Termos e Condições regulam o acesso e a utilização do website
              tiagodigitalwave.eu e dos serviços de email outbound B2B prestados pela Digital Wave,
              em conformidade com a legislação portuguesa, designadamente o Código Civil, a Lei n.º 7/2004
              de 7 de janeiro (comércio eletrónico), o Decreto-Lei n.º 24/2014 (contratos à distância) e
              o Regulamento (UE) 2016/679 (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">3. Aceitação</h2>
            <p>
              A utilização deste website implica a aceitação integral destes Termos. Caso não concorde
              com qualquer cláusula, deverá abster-se de utilizar o website e os nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">4. Serviços prestados</h2>
            <p>
              A Digital Wave presta serviços de aquisição comercial por email para empresas B2B,
              incluindo construção de listas, infraestrutura de envio, redação de copy, gestão de
              cadências e qualificação de respostas. Os serviços são contratados após reunião prévia
              e mediante proposta comercial específica.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">5. Propriedade intelectual</h2>
            <p>
              Todos os conteúdos do website (textos, gráficos, logótipos, código) são propriedade da
              Digital Wave ou licenciados, encontrando-se protegidos pelo Código do Direito de Autor e
              dos Direitos Conexos (Decreto-Lei n.º 63/85). É proibida a reprodução, distribuição ou
              modificação sem autorização escrita prévia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">6. Limitação de responsabilidade</h2>
            <p>
              A Digital Wave não se responsabiliza por interrupções, erros ou indisponibilidades
              temporárias do website. Os conteúdos têm carácter informativo e podem ser atualizados
              sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">7. Lei aplicável e foro</h2>
            <p>
              Os presentes Termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio
              é competente o foro da comarca do Porto, com expressa renúncia a qualquer outro.
              Em alternativa, o utilizador pode recorrer à plataforma europeia de resolução de
              litígios em linha disponível em{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-wave underline">
                ec.europa.eu/consumers/odr
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">8. Contacto</h2>
            <p>
              Para qualquer questão relacionada com estes Termos, contacte-nos através de{" "}
              <a href="mailto:hello@tiagodigitalwave.eu" className="text-wave underline">hello@tiagodigitalwave.eu</a>.
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
