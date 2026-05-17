import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer, CookieBanner } from "@/components/site/Footer";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies, Digital Wave" },
      { name: "description", content: "Informação sobre os cookies utilizados pela Digital Wave, conforme a Lei n.º 41/2004 e o RGPD." },
      { property: "og:title", content: "Política de Cookies, Digital Wave" },
      { property: "og:description", content: "Que cookies usamos, para quê e como podes geri-los." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const reset = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("dw-cookies");
    window.location.reload();
  };

  return (
    <div className="dark">
      <Nav />
      <main className="section pt-36 md:pt-44">
        <span className="eyebrow">Legal · Cookies</span>
        <h1 className="display mt-6">Política de Cookies</h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-PT")}</p>

        <div className="mt-12 space-y-8 max-w-3xl text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl mb-3">1. O que são cookies</h2>
            <p>
              Cookies são pequenos ficheiros de texto guardados no seu dispositivo quando visita um
              website. Permitem reconhecer o utilizador e melhorar a experiência de navegação.
              Esta política cumpre a Lei n.º 41/2004, de 18 de agosto (privacidade nas comunicações
              eletrónicas), e o Regulamento (UE) 2016/679 (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">2. Tipos de cookies utilizados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2 border border-border rounded-lg">
                <thead className="bg-muted/40 text-left">
                  <tr>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Finalidade</th>
                    <th className="p-3">Base legal</th>
                    <th className="p-3">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Estritamente necessários</td>
                    <td className="p-3">Funcionamento técnico do website e registo da escolha de cookies.</td>
                    <td className="p-3">Interesse legítimo</td>
                    <td className="p-3">Sessão / 12 meses</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Analíticos</td>
                    <td className="p-3">Medir tráfego e melhorar conteúdos (de forma agregada).</td>
                    <td className="p-3">Consentimento</td>
                    <td className="p-3">Até 24 meses</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Funcionais</td>
                    <td className="p-3">Memorizar preferências e otimizar a experiência.</td>
                    <td className="p-3">Consentimento</td>
                    <td className="p-3">Até 12 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-3">3. Consentimento</h2>
            <p>
              Na primeira visita ao website é apresentada uma faixa onde pode aceitar ou recusar os
              cookies opcionais. Os cookies estritamente necessários não requerem consentimento, nos
              termos do n.º 2 do artigo 5.º da Lei n.º 41/2004.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">4. Como gerir cookies</h2>
            <p>
              Pode, a qualquer momento, alterar as preferências eliminando os cookies do seu browser
              ou repondo a sua escolha aqui:
            </p>
            <button onClick={reset} className="btn-ghost mt-4 !py-2 !px-4 !text-sm">
              Repor preferências de cookies
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              A maioria dos browsers permite bloquear ou apagar cookies nas definições (Chrome,
              Firefox, Safari, Edge). Bloquear cookies estritamente necessários pode afetar o
              correto funcionamento do website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-3">5. Contacto</h2>
            <p>
              Para esclarecimentos sobre esta Política, contacte{" "}
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
