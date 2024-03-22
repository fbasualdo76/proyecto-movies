import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from "formik"
import axios from "axios"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
const MovieModal = ({ open, handleClose, setIsMovieCreated }) => {
    let initialValues = {
        name: "El Gran Torino",
        createdAt: "12 de Diciembre de 2008",
        description: "Gran Torino is a 2008 American drama film directed and produced by Clint Eastwood, who also starred in the film.",
        img: "https://upload.wikimedia.org/wikipedia/en/c/c6/Gran_Torino_poster.jpg"
    }
    const onSubmit = (data) => {
        let arg = {
            name: data.name,
            description: data.description,
            img: data.img,
            createdAt: data.createdAt,
            isLiked: false
        }
        /*axios.post("http://localhost:5000/movies", arg)*/
        axios.post("https://api-proyecto-movies.onrender.com/movies", arg)
            .then((res) => {
                handleClose()
                setIsMovieCreated(true);
            })
            .catch(err => console.log(err))
    }
    const { handleChange, handleSubmit } = useFormik({
        initialValues,
        //validationSchema,
        onSubmit
    })
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItem: "center",
                        height: "420px",
                    }}
                        onSubmit={handleSubmit}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Agregar película.
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            A modo de prueba se cargan valores por defecto.
                        </Typography>
                        <TextField
                            //id="outlined-basic"
                            label="Título de la película."
                            variant="outlined"
                            name="name"
                            fullWidth
                            onChange={handleChange}
                            value={initialValues.name}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            //id="outlined-basic"
                            label="Fecha de creación."
                            variant="outlined"
                            name="createdAt"
                            fullWidth
                            onChange={handleChange}
                            value={initialValues.createdAt}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            //id="outlined-basic"
                            label="Descripción."
                            variant="outlined"
                            name="description"
                            fullWidth
                            onChange={handleChange}
                            value={initialValues.description}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            //id="outlined-basic"
                            label="URL de la imagen."
                            variant="outlined"
                            name="img"
                            fullWidth
                            onChange={handleChange}
                            value={initialValues.img}
                            sx={{ mt: 2 }}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>AGREGAR</Button>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}
export default MovieModal