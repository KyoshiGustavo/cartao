// Controle da interface e dos eventos do MindAR.
document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const target = document.querySelector("[mindar-image-target]");
  const status = document.querySelector("#status");
  const hint = document.querySelector("#hint");
  const loading = document.querySelector("#loading");
  const scanning = document.querySelector("#scanning");

  if (!scene || !target) return;

  scene.addEventListener("arReady", () => {
    loading.style.display = "none";
    scanning.style.display = "flex";
    status.textContent = "Procurando o cartão…";
    hint.textContent = "Aponte a câmera para o target e mantenha-o visível.";
  });

  scene.addEventListener("arError", (event) => {
    loading.style.display = "none";
    scanning.style.display = "none";
    status.textContent = "Não foi possível iniciar a câmera.";
    hint.textContent = "Verifique a permissão da câmera e o acesso por HTTPS.";
    console.error("MindAR error:", event);
  });

  target.addEventListener("targetFound", () => {
    scanning.style.display = "none";
    status.textContent = "Cartão reconhecido ✓";
    hint.textContent = "Mova o celular lentamente para observar o tracking.";
  });

  target.addEventListener("targetLost", () => {
    scanning.style.display = "flex";
    status.textContent = "Cartão perdido";
    hint.textContent = "Reenquadre o cartão e melhore a iluminação se necessário.";
  });
});
