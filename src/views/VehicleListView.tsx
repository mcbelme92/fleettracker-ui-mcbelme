import { Container, Typography } from "@mui/material"
import type React from "react"

const VehicleListView: React.FC = () => {
  return (
      <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Lista de Vehículos
      </Typography>
      {/* Aquí va la tabla o componente VehicleTable */}
    </Container>
  )
}

export default VehicleListView