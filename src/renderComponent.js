module.exports = (source, imports, options) => {
  const { tag, classes } = options;
  const className = classes ? ` class="${classes}"` : '';

  return `
  <script>
  ${imports}
  export default ({ props }) => (<${tag}${className}>${source}</${tag}>);
  </script>
  `;
};
