package com.example.Consultorio.controllers;

import com.example.Consultorio.dto.ConsultaDTO;
import com.example.Consultorio.dto.PacienteDTO;
import com.example.Consultorio.entities.ConsultaEntity;
import com.example.Consultorio.entities.PacienteEntity;
import com.example.Consultorio.services.ConsultaService;
import com.example.Consultorio.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;


    @PostMapping
    public ResponseEntity<ConsultaDTO> agendarConsulta(@RequestBody ConsultaEntity consultaEntity) {
        ConsultaDTO consulta = consultaService.agendarConsulta(consultaEntity);
        return ResponseEntity.ok(consulta);
    }
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ConsultaEntity>> listarConsultas() {
        return ResponseEntity.ok(consultaService.listarConsultas());
    }


}
