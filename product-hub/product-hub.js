"use strict";

const container = document.querySelector("#products");
const template = document.querySelector("#product-card-template");

function renderProduct(product) {
  const card = template.content.cloneNode(true);
  const image = card.querySelector(".product-image");
  const name = card.querySelector(".product-name");
  const summary = card.querySelector(".summary");
  const link = card.querySelector(".product-link");

  image.src = product.image;
  image.alt = `${product.name} 상품 이미지`;
  name.textContent = product.name;
  summary.textContent = product.summary;
  link.href = product.affiliate_url;
  link.dataset.productId = product.product_id;
  link.setAttribute("aria-label", `${product.name} 쿠팡에서 확인`);
  return card;
}

fetch("products.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`PRODUCTS_HTTP_${response.status}`);
    return response.json();
  })
  .then(({ products }) => {
    container.replaceChildren(...products.map(renderProduct));
  })
  .catch(() => {
    const message = document.createElement("p");
    message.className = "error";
    message.textContent = "상품 정보를 불러오지 못했습니다.";
    container.replaceChildren(message);
  });
