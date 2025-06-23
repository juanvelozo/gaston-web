const CreateCategoryPage = (): React.JSX.Element => {
  return (
    <div>
      <h2>Crear categoría</h2>
      <br />
      <form>
        <label>Nombre:</label>
        <input type="text" name="name" required />
        <br />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
