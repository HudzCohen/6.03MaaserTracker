﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MaaserTracker.Data;

public class Source
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Income> Incomes { get; set; }
}
