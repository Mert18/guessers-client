export default (req, res) => {
  const url = process.env.NEXTAUTH_URL ?? "";
  res.redirect(url);
};
