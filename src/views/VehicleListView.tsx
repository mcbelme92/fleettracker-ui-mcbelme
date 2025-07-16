import { Container, Typography } from "@mui/material"
import type React from "react"
import VehicleListPage from "../pages/VehicleListPage"

const VehicleListView: React.FC = () => {
  return (
      <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Lista de Vehículos
      </Typography>
      {/* Aquí va la tabla o componente VehicleTable */}
      <VehicleListPage />
    </Container>
  )
}

export default VehicleListView