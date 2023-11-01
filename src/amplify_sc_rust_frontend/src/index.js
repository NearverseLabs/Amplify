import { amplify_sc_rust_backend } from "../../declarations/amplify_sc_rust_backend";

document.querySelector("form#greetings").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await amplify_sc_rust_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});
document.querySelector("form#register_user").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("my_name").value.toString();
  const twitter_name = document.getElementById("twitter_name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await amplify_sc_rust_backend.register_user(
      { 'name' : name, 'twitter_username' : twitter_name }
  );

  console.log(await amplify_sc_rust_backend.paginate_users(
      { 'page_number' : 1, 'page_size' : 10 }
  ))

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = JSON.stringify(greeting);

  return false;
});
