const handleSubmit = async () => {
  try {
    const { data, error } = await supabase.from("quotes").insert([
      {
        name,
        email,
        phone,
        message,
      },
    ]);

    console.log("SUCCESS DATA:", data);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      alert("Error: " + error.message);
      return;
    }

    alert("Submitted successfully");
  } catch (err) {
    console.error("CATCH ERROR:", err);
    alert("Catch error: " + JSON.stringify(err));
  }
};
