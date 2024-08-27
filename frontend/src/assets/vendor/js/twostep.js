const header = document.querySelector(".bs-stepper-header");
const stepAll = document.querySelectorAll(".bs-stepper-header .step");

header.addEventListener("click", function (e) {
  const step = e.target.closest(".step");
  const getAttributeStep = step.getAttribute("data-target");
  const formStep = document.querySelector(getAttributeStep);

  step.classList.add("active");
  formStep.classList.add("active");
  formStep.classList.add("dstepper-block");

  stepAll.forEach((s) => {
    const form = document.querySelector(s.getAttribute("data-target"));

    if (s.getAttribute("data-target") !== getAttributeStep) {
      s.classList.remove("active");
      form.classList.remove("active");
      form.classList.remove("dstepper-block");
    }
  });
});
